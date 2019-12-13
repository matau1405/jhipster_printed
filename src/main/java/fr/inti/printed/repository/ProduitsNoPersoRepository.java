package fr.inti.printed.repository;
import fr.inti.printed.domain.ProduitsNoPerso;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ProduitsNoPerso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduitsNoPersoRepository extends MongoRepository<ProduitsNoPerso, String> {

}
