package fr.inti.printed.web.rest;

import fr.inti.printed.domain.ProduitsNoPerso;
import fr.inti.printed.repository.ProduitsNoPersoRepository;
import fr.inti.printed.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.inti.printed.domain.ProduitsNoPerso}.
 */
@RestController
@RequestMapping("/api")
public class ProduitsNoPersoResource {

    private final Logger log = LoggerFactory.getLogger(ProduitsNoPersoResource.class);

    private static final String ENTITY_NAME = "produitsNoPerso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProduitsNoPersoRepository produitsNoPersoRepository;

    public ProduitsNoPersoResource(ProduitsNoPersoRepository produitsNoPersoRepository) {
        this.produitsNoPersoRepository = produitsNoPersoRepository;
    }

    /**
     * {@code POST  /produits-no-persos} : Create a new produitsNoPerso.
     *
     * @param produitsNoPerso the produitsNoPerso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produitsNoPerso, or with status {@code 400 (Bad Request)} if the produitsNoPerso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produits-no-persos")
    public ResponseEntity<ProduitsNoPerso> createProduitsNoPerso(@RequestBody ProduitsNoPerso produitsNoPerso) throws URISyntaxException {
        log.debug("REST request to save ProduitsNoPerso : {}", produitsNoPerso);
        if (produitsNoPerso.getId() != null) {
            throw new BadRequestAlertException("A new produitsNoPerso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProduitsNoPerso result = produitsNoPersoRepository.save(produitsNoPerso);
        return ResponseEntity.created(new URI("/api/produits-no-persos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produits-no-persos} : Updates an existing produitsNoPerso.
     *
     * @param produitsNoPerso the produitsNoPerso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produitsNoPerso,
     * or with status {@code 400 (Bad Request)} if the produitsNoPerso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produitsNoPerso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produits-no-persos")
    public ResponseEntity<ProduitsNoPerso> updateProduitsNoPerso(@RequestBody ProduitsNoPerso produitsNoPerso) throws URISyntaxException {
        log.debug("REST request to update ProduitsNoPerso : {}", produitsNoPerso);
        if (produitsNoPerso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProduitsNoPerso result = produitsNoPersoRepository.save(produitsNoPerso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, produitsNoPerso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /produits-no-persos} : get all the produitsNoPersos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produitsNoPersos in body.
     */
    @GetMapping("/produits-no-persos")
    public List<ProduitsNoPerso> getAllProduitsNoPersos() {
        log.debug("REST request to get all ProduitsNoPersos");
        return produitsNoPersoRepository.findAll();
    }

    /**
     * {@code GET  /produits-no-persos/:id} : get the "id" produitsNoPerso.
     *
     * @param id the id of the produitsNoPerso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produitsNoPerso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produits-no-persos/{id}")
    public ResponseEntity<ProduitsNoPerso> getProduitsNoPerso(@PathVariable String id) {
        log.debug("REST request to get ProduitsNoPerso : {}", id);
        Optional<ProduitsNoPerso> produitsNoPerso = produitsNoPersoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produitsNoPerso);
    }

    /**
     * {@code DELETE  /produits-no-persos/:id} : delete the "id" produitsNoPerso.
     *
     * @param id the id of the produitsNoPerso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produits-no-persos/{id}")
    public ResponseEntity<Void> deleteProduitsNoPerso(@PathVariable String id) {
        log.debug("REST request to delete ProduitsNoPerso : {}", id);
        produitsNoPersoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
