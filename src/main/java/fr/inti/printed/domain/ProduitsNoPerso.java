package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A ProduitsNoPerso.
 */
@Document(collection = "produits_no_perso")
public class ProduitsNoPerso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("type_produits")
    private String typeProduits;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTypeProduits() {
        return typeProduits;
    }

    public ProduitsNoPerso typeProduits(String typeProduits) {
        this.typeProduits = typeProduits;
        return this;
    }

    public void setTypeProduits(String typeProduits) {
        this.typeProduits = typeProduits;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProduitsNoPerso)) {
            return false;
        }
        return id != null && id.equals(((ProduitsNoPerso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProduitsNoPerso{" +
            "id=" + getId() +
            ", typeProduits='" + getTypeProduits() + "'" +
            "}";
    }
}
