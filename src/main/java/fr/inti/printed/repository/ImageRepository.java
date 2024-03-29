package fr.inti.printed.repository;
import fr.inti.printed.domain.Image;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageRepository extends MongoRepository<Image, String> {

}
