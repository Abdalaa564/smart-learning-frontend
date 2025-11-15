import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TestimonialsSection } from "./testimonials-section/testimonials-section";
import { HeroSection } from "./hero-section/hero-section";
import { CategoriesSection } from "./categories-section/categories-section";
import { InstructorsSection } from "./instructors-section/instructors-section";
import { BlogPostsSection } from "./blog-posts-section/blog-posts-section";
import { CtaSection } from "./cta-section/cta-section";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, TestimonialsSection, HeroSection, CategoriesSection, InstructorsSection, BlogPostsSection, CtaSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
