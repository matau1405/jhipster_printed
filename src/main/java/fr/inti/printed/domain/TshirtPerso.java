package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A TshirtPerso.
 */
@Document(collection = "tshirt_perso")
public class TshirtPerso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TshirtPerso)) {
            return false;
        }
        return id != null && id.equals(((TshirtPerso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TshirtPerso{" +
            "id=" + getId() +
            "}";
    }
}
