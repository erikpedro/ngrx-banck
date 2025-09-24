import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesHomeComponent } from './transacoes-home.component';

describe('TransacoesHomeComponent', () => {
  let component: TransacoesHomeComponent;
  let fixture: ComponentFixture<TransacoesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacoesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacoesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
