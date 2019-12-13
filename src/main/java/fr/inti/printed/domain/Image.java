package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A Image.
 */
@Document(collection = "image")
public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("url")
    private String url;

    @Field("longueur_img")
    private Float longueurImg;

    @Field("largeur_img")
    private Float largeurImg;

    @Field("poids_img")
    private Long poidsImg;

    @Field("position_img")
    private String positionImg;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Image url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Float getLongueurImg() {
        return longueurImg;
    }

    public Image longueurImg(Float longueurImg) {
        this.longueurImg = longueurImg;
        return this;
    }

    public void setLongueurImg(Float longueurImg) {
        this.longueurImg = longueurImg;
    }

    public Float getLargeurImg() {
        return largeurImg;
    }

    public Image largeurImg(Float largeurImg) {
        this.largeurImg = largeurImg;
        return this;
    }

    public void setLargeurImg(Float largeurImg) {
        this.largeurImg = largeurImg;
    }

    public Long getPoidsImg() {
        return poidsImg;
    }

    public Image poidsImg(Long poidsImg) {
        this.poidsImg = poidsImg;
        return this;
    }

    public void setPoidsImg(Long poidsImg) {
        this.poidsImg = poidsImg;
    }

    public String getPositionImg() {
        return positionImg;
    }

    public Image positionImg(String positionImg) {
        this.positionImg = positionImg;
        return this;
    }

    public void setPositionImg(String positionImg) {
        this.positionImg = positionImg;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Image)) {
            return false;
        }
        return id != null && id.equals(((Image) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", longueurImg=" + getLongueurImg() +
            ", largeurImg=" + getLargeurImg() +
            ", poidsImg=" + getPoidsImg() +
            ", positionImg='" + getPositionImg() + "'" +
            "}";
    }
}
