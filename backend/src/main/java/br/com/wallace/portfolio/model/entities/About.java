package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "about")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
