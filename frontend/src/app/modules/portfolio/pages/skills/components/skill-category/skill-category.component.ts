import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Skill, SKILL_CATEGORY_ICONS } from '../../../../models/skill.model';
import { SkillCardComponent } from '../skill-card/skill-card.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-skill-category',
  standalone: true,
  imports: [CommonModule, MatIconModule, SkillCardComponent, ButtonComponent],
  templateUrl: './skill-category.component.html',
  styleUrl: './skill-category.component.scss',
})
export class SkillCategoryComponent {
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) skills!: Skill[];
  @Input() categoryIcon?: string;
  @Input() maxVisible: number = 6; 

  showAll = false;
  displayedSkills: Skill[] = [];

  ngOnInit(): void {
    if (!this.categoryIcon && this.skills.length > 0) {
      this.categoryIcon = SKILL_CATEGORY_ICONS[this.skills[0].category] || 'code';
    }
    this.updateDisplayedSkills();
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.updateDisplayedSkills();

    if (!this.showAll) {
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY - 100,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  private updateDisplayedSkills(): void {
    if (this.showAll) {
      this.displayedSkills = this.skills;
    } else {
      this.displayedSkills = this.skills.slice(0, this.maxVisible);
    }
  }
}