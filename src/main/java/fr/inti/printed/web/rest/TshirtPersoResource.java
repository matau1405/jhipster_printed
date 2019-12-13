package fr.inti.printed.web.rest;

import fr.inti.printed.domain.TshirtPerso;
import fr.inti.printed.repository.TshirtPersoRepository;
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
 * REST controller for managing {@link fr.inti.printed.domain.TshirtPerso}.
 */
@RestController
@RequestMapping("/api")
public class TshirtPersoResource {

    private final Logger log = LoggerFactory.getLogger(TshirtPersoResource.class);

    private static final String ENTITY_NAME = "tshirtPerso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TshirtPersoRepository tshirtPersoRepository;

    public TshirtPersoResource(TshirtPersoRepository tshirtPersoRepository) {
        this.tshirtPersoRepository = tshirtPersoRepository;
    }

    /**
     * {@code POST  /tshirt-persos} : Create a new tshirtPerso.
     *
     * @param tshirtPerso the tshirtPerso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tshirtPerso, or with status {@code 400 (Bad Request)} if the tshirtPerso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tshirt-persos")
    public ResponseEntity<TshirtPerso> createTshirtPerso(@RequestBody TshirtPerso tshirtPerso) throws URISyntaxException {
        log.debug("REST request to save TshirtPerso : {}", tshirtPerso);
        if (tshirtPerso.getId() != null) {
            throw new BadRequestAlertException("A new tshirtPerso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TshirtPerso result = tshirtPersoRepository.save(tshirtPerso);
        return ResponseEntity.created(new URI("/api/tshirt-persos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tshirt-persos} : Updates an existing tshirtPerso.
     *
     * @param tshirtPerso the tshirtPerso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tshirtPerso,
     * or with status {@code 400 (Bad Request)} if the tshirtPerso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tshirtPerso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tshirt-persos")
    public ResponseEntity<TshirtPerso> updateTshirtPerso(@RequestBody TshirtPerso tshirtPerso) throws URISyntaxException {
        log.debug("REST request to update TshirtPerso : {}", tshirtPerso);
        if (tshirtPerso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TshirtPerso result = tshirtPersoRepository.save(tshirtPerso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tshirtPerso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tshirt-persos} : get all the tshirtPersos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tshirtPersos in body.
     */
    @GetMapping("/tshirt-persos")
    public List<TshirtPerso> getAllTshirtPersos() {
        log.debug("REST request to get all TshirtPersos");
        return tshirtPersoRepository.findAll();
    }

    /**
     * {@code GET  /tshirt-persos/:id} : get the "id" tshirtPerso.
     *
     * @param id the id of the tshirtPerso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tshirtPerso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tshirt-persos/{id}")
    public ResponseEntity<TshirtPerso> getTshirtPerso(@PathVariable String id) {
        log.debug("REST request to get TshirtPerso : {}", id);
        Optional<TshirtPerso> tshirtPerso = tshirtPersoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tshirtPerso);
    }

    /**
     * {@code DELETE  /tshirt-persos/:id} : delete the "id" tshirtPerso.
     *
     * @param id the id of the tshirtPerso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tshirt-persos/{id}")
    public ResponseEntity<Void> deleteTshirtPerso(@PathVariable String id) {
        log.debug("REST request to delete TshirtPerso : {}", id);
        tshirtPersoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
