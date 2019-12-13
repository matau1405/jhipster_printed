package fr.inti.printed.repository;
import fr.inti.printed.domain.TshirtPerso;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TshirtPerso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TshirtPersoRepository extends MongoRepository<TshirtPerso, String> {

}
