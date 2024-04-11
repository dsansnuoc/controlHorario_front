import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrganizacionesComponent } from './listado-organizaciones.component';

describe('ListadoOrganizacionesComponent', () => {
  let component: ListadoOrganizacionesComponent;
  let fixture: ComponentFixture<ListadoOrganizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoOrganizacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
