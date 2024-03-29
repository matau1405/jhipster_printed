package fr.inti.printed.web.rest;

import fr.inti.printed.PrintedApp;
import fr.inti.printed.domain.Image;
import fr.inti.printed.repository.ImageRepository;
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
 * Integration tests for the {@link ImageResource} REST controller.
 */
@SpringBootTest(classes = PrintedApp.class)
public class ImageResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Float DEFAULT_LONGUEUR_IMG = 1F;
    private static final Float UPDATED_LONGUEUR_IMG = 2F;

    private static final Float DEFAULT_LARGEUR_IMG = 1F;
    private static final Float UPDATED_LARGEUR_IMG = 2F;

    private static final Long DEFAULT_POIDS_IMG = 1L;
    private static final Long UPDATED_POIDS_IMG = 2L;

    private static final String DEFAULT_POSITION_IMG = "AAAAAAAAAA";
    private static final String UPDATED_POSITION_IMG = "BBBBBBBBBB";

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restImageMockMvc;

    private Image image;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImageResource imageResource = new ImageResource(imageRepository);
        this.restImageMockMvc = MockMvcBuilders.standaloneSetup(imageResource)
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
    public static Image createEntity() {
        Image image = new Image()
            .url(DEFAULT_URL)
            .longueurImg(DEFAULT_LONGUEUR_IMG)
            .largeurImg(DEFAULT_LARGEUR_IMG)
            .poidsImg(DEFAULT_POIDS_IMG)
            .positionImg(DEFAULT_POSITION_IMG);
        return image;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Image createUpdatedEntity() {
        Image image = new Image()
            .url(UPDATED_URL)
            .longueurImg(UPDATED_LONGUEUR_IMG)
            .largeurImg(UPDATED_LARGEUR_IMG)
            .poidsImg(UPDATED_POIDS_IMG)
            .positionImg(UPDATED_POSITION_IMG);
        return image;
    }

    @BeforeEach
    public void initTest() {
        imageRepository.deleteAll();
        image = createEntity();
    }

    @Test
    public void createImage() throws Exception {
        int databaseSizeBeforeCreate = imageRepository.findAll().size();

        // Create the Image
        restImageMockMvc.perform(post("/api/images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(image)))
            .andExpect(status().isCreated());

        // Validate the Image in the database
        List<Image> imageList = imageRepository.findAll();
        assertThat(imageList).hasSize(databaseSizeBeforeCreate + 1);
        Image testImage = imageList.get(imageList.size() - 1);
        assertThat(testImage.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testImage.getLongueurImg()).isEqualTo(DEFAULT_LONGUEUR_IMG);
        assertThat(testImage.getLargeurImg()).isEqualTo(DEFAULT_LARGEUR_IMG);
        assertThat(testImage.getPoidsImg()).isEqualTo(DEFAULT_POIDS_IMG);
        assertThat(testImage.getPositionImg()).isEqualTo(DEFAULT_POSITION_IMG);
    }

    @Test
    public void createImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imageRepository.findAll().size();

        // Create the Image with an existing ID
        image.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restImageMockMvc.perform(post("/api/images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(image)))
            .andExpect(status().isBadRequest());

        // Validate the Image in the database
        List<Image> imageList = imageRepository.findAll();
        assertThat(imageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllImages() throws Exception {
        // Initialize the database
        imageRepository.save(image);

        // Get all the imageList
        restImageMockMvc.perform(get("/api/images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(image.getId())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].longueurImg").value(hasItem(DEFAULT_LONGUEUR_IMG.doubleValue())))
            .andExpect(jsonPath("$.[*].largeurImg").value(hasItem(DEFAULT_LARGEUR_IMG.doubleValue())))
            .andExpect(jsonPath("$.[*].poidsImg").value(hasItem(DEFAULT_POIDS_IMG.intValue())))
            .andExpect(jsonPath("$.[*].positionImg").value(hasItem(DEFAULT_POSITION_IMG)));
    }
    
    @Test
    public void getImage() throws Exception {
        // Initialize the database
        imageRepository.save(image);

        // Get the image
        restImageMockMvc.perform(get("/api/images/{id}", image.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(image.getId()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.longueurImg").value(DEFAULT_LONGUEUR_IMG.doubleValue()))
            .andExpect(jsonPath("$.largeurImg").value(DEFAULT_LARGEUR_IMG.doubleValue()))
            .andExpect(jsonPath("$.poidsImg").value(DEFAULT_POIDS_IMG.intValue()))
            .andExpect(jsonPath("$.positionImg").value(DEFAULT_POSITION_IMG));
    }

    @Test
    public void getNonExistingImage() throws Exception {
        // Get the image
        restImageMockMvc.perform(get("/api/images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateImage() throws Exception {
        // Initialize the database
        imageRepository.save(image);

        int databaseSizeBeforeUpdate = imageRepository.findAll().size();

        // Update the image
        Image updatedImage = imageRepository.findById(image.getId()).get();
        updatedImage
            .url(UPDATED_URL)
            .longueurImg(UPDATED_LONGUEUR_IMG)
            .largeurImg(UPDATED_LARGEUR_IMG)
            .poidsImg(UPDATED_POIDS_IMG)
            .positionImg(UPDATED_POSITION_IMG);

        restImageMockMvc.perform(put("/api/images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImage)))
            .andExpect(status().isOk());

        // Validate the Image in the database
        List<Image> imageList = imageRepository.findAll();
        assertThat(imageList).hasSize(databaseSizeBeforeUpdate);
        Image testImage = imageList.get(imageList.size() - 1);
        assertThat(testImage.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testImage.getLongueurImg()).isEqualTo(UPDATED_LONGUEUR_IMG);
        assertThat(testImage.getLargeurImg()).isEqualTo(UPDATED_LARGEUR_IMG);
        assertThat(testImage.getPoidsImg()).isEqualTo(UPDATED_POIDS_IMG);
        assertThat(testImage.getPositionImg()).isEqualTo(UPDATED_POSITION_IMG);
    }

    @Test
    public void updateNonExistingImage() throws Exception {
        int databaseSizeBeforeUpdate = imageRepository.findAll().size();

        // Create the Image

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImageMockMvc.perform(put("/api/images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(image)))
            .andExpect(status().isBadRequest());

        // Validate the Image in the database
        List<Image> imageList = imageRepository.findAll();
        assertThat(imageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteImage() throws Exception {
        // Initialize the database
        imageRepository.save(image);

        int databaseSizeBeforeDelete = imageRepository.findAll().size();

        // Delete the image
        restImageMockMvc.perform(delete("/api/images/{id}", image.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Image> imageList = imageRepository.findAll();
        assertThat(imageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Image.class);
        Image image1 = new Image();
        image1.setId("id1");
        Image image2 = new Image();
        image2.setId(image1.getId());
        assertThat(image1).isEqualTo(image2);
        image2.setId("id2");
        assertThat(image1).isNotEqualTo(image2);
        image1.setId(null);
        assertThat(image1).isNotEqualTo(image2);
    }
}
