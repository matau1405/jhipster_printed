package fr.inti.printed.web.rest;

import fr.inti.printed.PrintedApp;
import fr.inti.printed.domain.TshirtPerso;
import fr.inti.printed.repository.TshirtPersoRepository;
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


import java.util.List;

import static fr.inti.printed.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TshirtPersoResource} REST controller.
 */
@SpringBootTest(classes = PrintedApp.class)
public class TshirtPersoResourceIT {

    @Autowired
    private TshirtPersoRepository tshirtPersoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTshirtPersoMockMvc;

    private TshirtPerso tshirtPerso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TshirtPersoResource tshirtPersoResource = new TshirtPersoResource(tshirtPersoRepository);
        this.restTshirtPersoMockMvc = MockMvcBuilders.standaloneSetup(tshirtPersoResource)
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
    public static TshirtPerso createEntity() {
        TshirtPerso tshirtPerso = new TshirtPerso();
        return tshirtPerso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TshirtPerso createUpdatedEntity() {
        TshirtPerso tshirtPerso = new TshirtPerso();
        return tshirtPerso;
    }

    @BeforeEach
    public void initTest() {
        tshirtPersoRepository.deleteAll();
        tshirtPerso = createEntity();
    }

    @Test
    public void createTshirtPerso() throws Exception {
        int databaseSizeBeforeCreate = tshirtPersoRepository.findAll().size();

        // Create the TshirtPerso
        restTshirtPersoMockMvc.perform(post("/api/tshirt-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tshirtPerso)))
            .andExpect(status().isCreated());

        // Validate the TshirtPerso in the database
        List<TshirtPerso> tshirtPersoList = tshirtPersoRepository.findAll();
        assertThat(tshirtPersoList).hasSize(databaseSizeBeforeCreate + 1);
        TshirtPerso testTshirtPerso = tshirtPersoList.get(tshirtPersoList.size() - 1);
    }

    @Test
    public void createTshirtPersoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tshirtPersoRepository.findAll().size();

        // Create the TshirtPerso with an existing ID
        tshirtPerso.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTshirtPersoMockMvc.perform(post("/api/tshirt-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tshirtPerso)))
            .andExpect(status().isBadRequest());

        // Validate the TshirtPerso in the database
        List<TshirtPerso> tshirtPersoList = tshirtPersoRepository.findAll();
        assertThat(tshirtPersoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllTshirtPersos() throws Exception {
        // Initialize the database
        tshirtPersoRepository.save(tshirtPerso);

        // Get all the tshirtPersoList
        restTshirtPersoMockMvc.perform(get("/api/tshirt-persos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tshirtPerso.getId())));
    }
    
    @Test
    public void getTshirtPerso() throws Exception {
        // Initialize the database
        tshirtPersoRepository.save(tshirtPerso);

        // Get the tshirtPerso
        restTshirtPersoMockMvc.perform(get("/api/tshirt-persos/{id}", tshirtPerso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tshirtPerso.getId()));
    }

    @Test
    public void getNonExistingTshirtPerso() throws Exception {
        // Get the tshirtPerso
        restTshirtPersoMockMvc.perform(get("/api/tshirt-persos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTshirtPerso() throws Exception {
        // Initialize the database
        tshirtPersoRepository.save(tshirtPerso);

        int databaseSizeBeforeUpdate = tshirtPersoRepository.findAll().size();

        // Update the tshirtPerso
        TshirtPerso updatedTshirtPerso = tshirtPersoRepository.findById(tshirtPerso.getId()).get();

        restTshirtPersoMockMvc.perform(put("/api/tshirt-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTshirtPerso)))
            .andExpect(status().isOk());

        // Validate the TshirtPerso in the database
        List<TshirtPerso> tshirtPersoList = tshirtPersoRepository.findAll();
        assertThat(tshirtPersoList).hasSize(databaseSizeBeforeUpdate);
        TshirtPerso testTshirtPerso = tshirtPersoList.get(tshirtPersoList.size() - 1);
    }

    @Test
    public void updateNonExistingTshirtPerso() throws Exception {
        int databaseSizeBeforeUpdate = tshirtPersoRepository.findAll().size();

        // Create the TshirtPerso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTshirtPersoMockMvc.perform(put("/api/tshirt-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tshirtPerso)))
            .andExpect(status().isBadRequest());

        // Validate the TshirtPerso in the database
        List<TshirtPerso> tshirtPersoList = tshirtPersoRepository.findAll();
        assertThat(tshirtPersoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTshirtPerso() throws Exception {
        // Initialize the database
        tshirtPersoRepository.save(tshirtPerso);

        int databaseSizeBeforeDelete = tshirtPersoRepository.findAll().size();

        // Delete the tshirtPerso
        restTshirtPersoMockMvc.perform(delete("/api/tshirt-persos/{id}", tshirtPerso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TshirtPerso> tshirtPersoList = tshirtPersoRepository.findAll();
        assertThat(tshirtPersoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TshirtPerso.class);
        TshirtPerso tshirtPerso1 = new TshirtPerso();
        tshirtPerso1.setId("id1");
        TshirtPerso tshirtPerso2 = new TshirtPerso();
        tshirtPerso2.setId(tshirtPerso1.getId());
        assertThat(tshirtPerso1).isEqualTo(tshirtPerso2);
        tshirtPerso2.setId("id2");
        assertThat(tshirtPerso1).isNotEqualTo(tshirtPerso2);
        tshirtPerso1.setId(null);
        assertThat(tshirtPerso1).isNotEqualTo(tshirtPerso2);
    }
}
