import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposPausasComponent } from './listado-tipos-pausas.component';

describe('ListadoTiposPausasComponent', () => {
  let component: ListadoTiposPausasComponent;
  let fixture: ComponentFixture<ListadoTiposPausasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTiposPausasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoTiposPausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
