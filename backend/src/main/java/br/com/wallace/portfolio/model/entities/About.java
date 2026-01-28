package br.com.wallace.portfolio.model.entities;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    private Long id = 1L;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    private String profileImage;
    private String backgroundImage;

    @ElementCollection
    @CollectionTable(name = "about_texts", joinColumns = @JoinColumn(name = "about_id"))
    @Column(name = "text", columnDefinition = "TEXT")
    private List<String> aboutTexts;

    private String philosophyTitle;

    @Column(columnDefinition = "TEXT")
    private String philosophyText;

    @ElementCollection
    @CollectionTable(name = "about_future_goals", joinColumns = @JoinColumn(name = "about_id"))
    @Column(name = "goal", columnDefinition = "TEXT")
    private List<String> futureGoals;
}
