package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A Produits.
 */
@Document(collection = "produits")
public class Produits implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("id_prod")
    private String idProd;

    @Field("nom_prod")
    private String nomProd;

    @Field("description_prod")
    private String descriptionProd;

    @Field("prix_prod")
    private String prixProd;

    @Field("dispo")
    private Boolean dispo;

    @Field("stock")
    private Long stock;

    @Field("marque")
    private String marque;

    @Field("personnalisable")
    private Boolean personnalisable;

    @Field("umage_prod")
    private String umageProd;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdProd() {
        return idProd;
    }

    public Produits idProd(String idProd) {
        this.idProd = idProd;
        return this;
    }

    public void setIdProd(String idProd) {
        this.idProd = idProd;
    }

    public String getNomProd() {
        return nomProd;
    }

    public Produits nomProd(String nomProd) {
        this.nomProd = nomProd;
        return this;
    }

    public void setNomProd(String nomProd) {
        this.nomProd = nomProd;
    }

    public String getDescriptionProd() {
        return descriptionProd;
    }

    public Produits descriptionProd(String descriptionProd) {
        this.descriptionProd = descriptionProd;
        return this;
    }

    public void setDescriptionProd(String descriptionProd) {
        this.descriptionProd = descriptionProd;
    }

    public String getPrixProd() {
        return prixProd;
    }

    public Produits prixProd(String prixProd) {
        this.prixProd = prixProd;
        return this;
    }

    public void setPrixProd(String prixProd) {
        this.prixProd = prixProd;
    }

    public Boolean isDispo() {
        return dispo;
    }

    public Produits dispo(Boolean dispo) {
        this.dispo = dispo;
        return this;
    }

    public void setDispo(Boolean dispo) {
        this.dispo = dispo;
    }

    public Long getStock() {
        return stock;
    }

    public Produits stock(Long stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public String getMarque() {
        return marque;
    }

    public Produits marque(String marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Boolean isPersonnalisable() {
        return personnalisable;
    }

    public Produits personnalisable(Boolean personnalisable) {
        this.personnalisable = personnalisable;
        return this;
    }

    public void setPersonnalisable(Boolean personnalisable) {
        this.personnalisable = personnalisable;
    }

    public String getUmageProd() {
        return umageProd;
    }

    public Produits umageProd(String umageProd) {
        this.umageProd = umageProd;
        return this;
    }

    public void setUmageProd(String umageProd) {
        this.umageProd = umageProd;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produits)) {
            return false;
        }
        return id != null && id.equals(((Produits) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Produits{" +
            "id=" + getId() +
            ", idProd='" + getIdProd() + "'" +
            ", nomProd='" + getNomProd() + "'" +
            ", descriptionProd='" + getDescriptionProd() + "'" +
            ", prixProd='" + getPrixProd() + "'" +
            ", dispo='" + isDispo() + "'" +
            ", stock=" + getStock() +
            ", marque='" + getMarque() + "'" +
            ", personnalisable='" + isPersonnalisable() + "'" +
            ", umageProd='" + getUmageProd() + "'" +
            "}";
    }
}
