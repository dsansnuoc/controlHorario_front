import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposSolicitudesComponent } from './listado-tipos-solicitudes.component';

describe('ListadoTiposSolicitudesComponent', () => {
  let component: ListadoTiposSolicitudesComponent;
  let fixture: ComponentFixture<ListadoTiposSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTiposSolicitudesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoTiposSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
