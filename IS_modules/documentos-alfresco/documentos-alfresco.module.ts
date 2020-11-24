import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentosAlfrescoComponent} from './documentos-alfresco/documentos-alfresco.component';
import {DocumentosService} from './Servicios/DocumentosService';
import {FormsModule} from '@angular/forms';
import {
  ButtonModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  FileUploadModule,
  InputTextareaModule,
  InputTextModule,
  TooltipModule,
  FieldsetModule,
  ProgressBarModule
} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    // Componentes de Primeng
    TooltipModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    FieldsetModule,
    ToastModule,
    TableModule,
    ProgressBarModule,
    TableModule
  ],
  declarations: [DocumentosAlfrescoComponent],
  exports: [DocumentosAlfrescoComponent],
  providers: [
    DocumentosService,
    ConfirmationService
  ]
})
export class DocumentosAlfrescoModule { }
