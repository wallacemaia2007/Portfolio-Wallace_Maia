package br.com.wallace.portfolio.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByFeaturedTrue();

    List<Project> findByCategoryIgnoreCase(String category);

    List<Project> findByTitleContainingIgnoreCase(String title);

    List<Project> findByCategoryIgnoreCaseAndFeatured(
            String category, Boolean featured);
}
