package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Expedition.
 */
@Document(collection = "expedition")
public class Expedition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("tracking_code")
    private String trackingCode;

    @NotNull
    @Field("date")
    private Instant date;

    @Field("details")
    private String details;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrackingCode() {
        return trackingCode;
    }

    public Expedition trackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
        return this;
    }

    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }

    public Instant getDate() {
        return date;
    }

    public Expedition date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public Expedition details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expedition)) {
            return false;
        }
        return id != null && id.equals(((Expedition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expedition{" +
            "id=" + getId() +
            ", trackingCode='" + getTrackingCode() + "'" +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
