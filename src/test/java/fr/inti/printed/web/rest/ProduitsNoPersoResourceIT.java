package fr.inti.printed.web.rest;

import fr.inti.printed.PrintedApp;
import fr.inti.printed.domain.ProduitsNoPerso;
import fr.inti.printed.repository.ProduitsNoPersoRepository;
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
 * Integration tests for the {@link ProduitsNoPersoResource} REST controller.
 */
@SpringBootTest(classes = PrintedApp.class)
public class ProduitsNoPersoResourceIT {

    private static final String DEFAULT_TYPE_PRODUITS = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_PRODUITS = "BBBBBBBBBB";

    @Autowired
    private ProduitsNoPersoRepository produitsNoPersoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProduitsNoPersoMockMvc;

    private ProduitsNoPerso produitsNoPerso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProduitsNoPersoResource produitsNoPersoResource = new ProduitsNoPersoResource(produitsNoPersoRepository);
        this.restProduitsNoPersoMockMvc = MockMvcBuilders.standaloneSetup(produitsNoPersoResource)
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
    public static ProduitsNoPerso createEntity() {
        ProduitsNoPerso produitsNoPerso = new ProduitsNoPerso()
            .typeProduits(DEFAULT_TYPE_PRODUITS);
        return produitsNoPerso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProduitsNoPerso createUpdatedEntity() {
        ProduitsNoPerso produitsNoPerso = new ProduitsNoPerso()
            .typeProduits(UPDATED_TYPE_PRODUITS);
        return produitsNoPerso;
    }

    @BeforeEach
    public void initTest() {
        produitsNoPersoRepository.deleteAll();
        produitsNoPerso = createEntity();
    }

    @Test
    public void createProduitsNoPerso() throws Exception {
        int databaseSizeBeforeCreate = produitsNoPersoRepository.findAll().size();

        // Create the ProduitsNoPerso
        restProduitsNoPersoMockMvc.perform(post("/api/produits-no-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produitsNoPerso)))
            .andExpect(status().isCreated());

        // Validate the ProduitsNoPerso in the database
        List<ProduitsNoPerso> produitsNoPersoList = produitsNoPersoRepository.findAll();
        assertThat(produitsNoPersoList).hasSize(databaseSizeBeforeCreate + 1);
        ProduitsNoPerso testProduitsNoPerso = produitsNoPersoList.get(produitsNoPersoList.size() - 1);
        assertThat(testProduitsNoPerso.getTypeProduits()).isEqualTo(DEFAULT_TYPE_PRODUITS);
    }

    @Test
    public void createProduitsNoPersoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produitsNoPersoRepository.findAll().size();

        // Create the ProduitsNoPerso with an existing ID
        produitsNoPerso.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduitsNoPersoMockMvc.perform(post("/api/produits-no-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produitsNoPerso)))
            .andExpect(status().isBadRequest());

        // Validate the ProduitsNoPerso in the database
        List<ProduitsNoPerso> produitsNoPersoList = produitsNoPersoRepository.findAll();
        assertThat(produitsNoPersoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProduitsNoPersos() throws Exception {
        // Initialize the database
        produitsNoPersoRepository.save(produitsNoPerso);

        // Get all the produitsNoPersoList
        restProduitsNoPersoMockMvc.perform(get("/api/produits-no-persos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produitsNoPerso.getId())))
            .andExpect(jsonPath("$.[*].typeProduits").value(hasItem(DEFAULT_TYPE_PRODUITS)));
    }
    
    @Test
    public void getProduitsNoPerso() throws Exception {
        // Initialize the database
        produitsNoPersoRepository.save(produitsNoPerso);

        // Get the produitsNoPerso
        restProduitsNoPersoMockMvc.perform(get("/api/produits-no-persos/{id}", produitsNoPerso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produitsNoPerso.getId()))
            .andExpect(jsonPath("$.typeProduits").value(DEFAULT_TYPE_PRODUITS));
    }

    @Test
    public void getNonExistingProduitsNoPerso() throws Exception {
        // Get the produitsNoPerso
        restProduitsNoPersoMockMvc.perform(get("/api/produits-no-persos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProduitsNoPerso() throws Exception {
        // Initialize the database
        produitsNoPersoRepository.save(produitsNoPerso);

        int databaseSizeBeforeUpdate = produitsNoPersoRepository.findAll().size();

        // Update the produitsNoPerso
        ProduitsNoPerso updatedProduitsNoPerso = produitsNoPersoRepository.findById(produitsNoPerso.getId()).get();
        updatedProduitsNoPerso
            .typeProduits(UPDATED_TYPE_PRODUITS);

        restProduitsNoPersoMockMvc.perform(put("/api/produits-no-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduitsNoPerso)))
            .andExpect(status().isOk());

        // Validate the ProduitsNoPerso in the database
        List<ProduitsNoPerso> produitsNoPersoList = produitsNoPersoRepository.findAll();
        assertThat(produitsNoPersoList).hasSize(databaseSizeBeforeUpdate);
        ProduitsNoPerso testProduitsNoPerso = produitsNoPersoList.get(produitsNoPersoList.size() - 1);
        assertThat(testProduitsNoPerso.getTypeProduits()).isEqualTo(UPDATED_TYPE_PRODUITS);
    }

    @Test
    public void updateNonExistingProduitsNoPerso() throws Exception {
        int databaseSizeBeforeUpdate = produitsNoPersoRepository.findAll().size();

        // Create the ProduitsNoPerso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduitsNoPersoMockMvc.perform(put("/api/produits-no-persos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produitsNoPerso)))
            .andExpect(status().isBadRequest());

        // Validate the ProduitsNoPerso in the database
        List<ProduitsNoPerso> produitsNoPersoList = produitsNoPersoRepository.findAll();
        assertThat(produitsNoPersoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProduitsNoPerso() throws Exception {
        // Initialize the database
        produitsNoPersoRepository.save(produitsNoPerso);

        int databaseSizeBeforeDelete = produitsNoPersoRepository.findAll().size();

        // Delete the produitsNoPerso
        restProduitsNoPersoMockMvc.perform(delete("/api/produits-no-persos/{id}", produitsNoPerso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProduitsNoPerso> produitsNoPersoList = produitsNoPersoRepository.findAll();
        assertThat(produitsNoPersoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProduitsNoPerso.class);
        ProduitsNoPerso produitsNoPerso1 = new ProduitsNoPerso();
        produitsNoPerso1.setId("id1");
        ProduitsNoPerso produitsNoPerso2 = new ProduitsNoPerso();
        produitsNoPerso2.setId(produitsNoPerso1.getId());
        assertThat(produitsNoPerso1).isEqualTo(produitsNoPerso2);
        produitsNoPerso2.setId("id2");
        assertThat(produitsNoPerso1).isNotEqualTo(produitsNoPerso2);
        produitsNoPerso1.setId(null);
        assertThat(produitsNoPerso1).isNotEqualTo(produitsNoPerso2);
    }
}
