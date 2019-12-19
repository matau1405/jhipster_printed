package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A Panier.
 */
@Document(collection = "panier")
public class Panier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("id_panier")
    private String idPanier;

    @Field("liste_produit")
    private String listeProduit;

    @Field("nombre_produits")
    private Integer nombreProduits;

    @Field("prix_total")
    private Double prixTotal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdPanier() {
        return idPanier;
    }

    public Panier idPanier(String idPanier) {
        this.idPanier = idPanier;
        return this;
    }

    public void setIdPanier(String idPanier) {
        this.idPanier = idPanier;
    }

    public String getListeProduit() {
        return listeProduit;
    }

    public Panier listeProduit(String listeProduit) {
        this.listeProduit = listeProduit;
        return this;
    }

    public void setListeProduit(String listeProduit) {
        this.listeProduit = listeProduit;
    }

    public Integer getNombreProduits() {
        return nombreProduits;
    }

    public Panier nombreProduits(Integer nombreProduits) {
        this.nombreProduits = nombreProduits;
        return this;
    }

    public void setNombreProduits(Integer nombreProduits) {
        this.nombreProduits = nombreProduits;
    }

    public Double getPrixTotal() {
        return prixTotal;
    }

    public Panier prixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
        return this;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Panier)) {
            return false;
        }
        return id != null && id.equals(((Panier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Panier{" +
            "id=" + getId() +
            ", idPanier='" + getIdPanier() + "'" +
            ", listeProduit='" + getListeProduit() + "'" +
            ", nombreProduits=" + getNombreProduits() +
            ", prixTotal=" + getPrixTotal() +
            "}";
    }
}
