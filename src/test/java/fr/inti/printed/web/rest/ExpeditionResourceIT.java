package fr.inti.printed.web.rest;

import fr.inti.printed.PrintedApp;
import fr.inti.printed.domain.Expedition;
import fr.inti.printed.repository.ExpeditionRepository;
import fr.inti.printed.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.inti.printed.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExpeditionResource} REST controller.
 */
@SpringBootTest(classes = PrintedApp.class)
public class ExpeditionResourceIT {

    private static final String DEFAULT_TRACKING_CODE = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    @Autowired
    private ExpeditionRepository expeditionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restExpeditionMockMvc;

    private Expedition expedition;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpeditionResource expeditionResource = new ExpeditionResource(expeditionRepository);
        this.restExpeditionMockMvc = MockMvcBuilders.standaloneSetup(expeditionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createEntity() {
        Expedition expedition = new Expedition()
            .trackingCode(DEFAULT_TRACKING_CODE)
            .date(DEFAULT_DATE)
            .details(DEFAULT_DETAILS);
        return expedition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createUpdatedEntity() {
        Expedition expedition = new Expedition()
            .trackingCode(UPDATED_TRACKING_CODE)
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS);
        return expedition;
    }

    @BeforeEach
    public void initTest() {
        expeditionRepository.deleteAll();
        expedition = createEntity();
    }

    @Test
    public void createExpedition() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();

        // Create the Expedition
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedition)))
            .andExpect(status().isCreated());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate + 1);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getTrackingCode()).isEqualTo(DEFAULT_TRACKING_CODE);
        assertThat(testExpedition.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExpedition.getDetails()).isEqualTo(DEFAULT_DETAILS);
    }

    @Test
    public void createExpeditionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();

        // Create the Expedition with an existing ID
        expedition.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedition)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = expeditionRepository.findAll().size();
        // set the field null
        expedition.setDate(null);

        // Create the Expedition, which fails.

        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedition)))
            .andExpect(status().isBadRequest());

        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllExpeditions() throws Exception {
        // Initialize the database
        expeditionRepository.save(expedition);

        // Get all the expeditionList
        restExpeditionMockMvc.perform(get("/api/expeditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expedition.getId())))
            .andExpect(jsonPath("$.[*].trackingCode").value(hasItem(DEFAULT_TRACKING_CODE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));
    }
    
    @Test
    public void getExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.save(expedition);

        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", expedition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expedition.getId()))
            .andExpect(jsonPath("$.trackingCode").value(DEFAULT_TRACKING_CODE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS));
    }

    @Test
    public void getNonExistingExpedition() throws Exception {
        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.save(expedition);

        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Update the expedition
        Expedition updatedExpedition = expeditionRepository.findById(expedition.getId()).get();
        updatedExpedition
            .trackingCode(UPDATED_TRACKING_CODE)
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS);

        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpedition)))
            .andExpect(status().isOk());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getTrackingCode()).isEqualTo(UPDATED_TRACKING_CODE);
        assertThat(testExpedition.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExpedition.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    public void updateNonExistingExpedition() throws Exception {
        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Create the Expedition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedition)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.save(expedition);

        int databaseSizeBeforeDelete = expeditionRepository.findAll().size();

        // Delete the expedition
        restExpeditionMockMvc.perform(delete("/api/expeditions/{id}", expedition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expedition.class);
        Expedition expedition1 = new Expedition();
        expedition1.setId("id1");
        Expedition expedition2 = new Expedition();
        expedition2.setId(expedition1.getId());
        assertThat(expedition1).isEqualTo(expedition2);
        expedition2.setId("id2");
        assertThat(expedition1).isNotEqualTo(expedition2);
        expedition1.setId(null);
        assertThat(expedition1).isNotEqualTo(expedition2);
    }
}
