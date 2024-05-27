import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosCompartidosComponent } from './listados-compartidos.component';

describe('ListadosCompartidosComponent', () => {
  let component: ListadosCompartidosComponent;
  let fixture: ComponentFixture<ListadosCompartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadosCompartidosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadosCompartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
