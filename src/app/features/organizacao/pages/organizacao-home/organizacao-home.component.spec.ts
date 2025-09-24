import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoHomeComponent } from './organizacao-home.component';

describe('OrganizacaoHomeComponent', () => {
  let component: OrganizacaoHomeComponent;
  let fixture: ComponentFixture<OrganizacaoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacaoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizacaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
