package br.com.wallace.portfolio.model.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "about")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    private String profileImage;
    private String backgroundImage;

    @ElementCollection
    @CollectionTable(name = "about_texts", joinColumns = @JoinColumn(name = "about_id"))
    @Column(name = "text", columnDefinition = "TEXT")
    private List<String> aboutTexts;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "about_id")
    private List<JourneyItem> journeyItems;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "about_id")
    private List<Education> educationList;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "about_id")
    private List<Value> values;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "about_id")
    private List<Hobby> hobbies;

    private String philosophyTitle;

    @Column(columnDefinition = "TEXT")
    private String philosophyText;

    @ElementCollection
    @CollectionTable(name = "about_future_goals", joinColumns = @JoinColumn(name = "about_id"))
    @Column(name = "goal", columnDefinition = "TEXT")
    private List<String> futureGoals;
}
