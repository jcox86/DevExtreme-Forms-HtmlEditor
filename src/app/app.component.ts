import {
  NgModule,
  ViewChild,
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  enableProdMode
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  DxFormModule,
  DxButtonModule,
  DxFormComponent,
  DxHtmlEditorModule,
  DxRadioGroupModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidationSummaryModule
} from "devextreme-angular";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DxFormComponent) requestForm: DxFormComponent;
  public createRequest: any;
  public ticketTypes: string[];
  public ticketTypeConfig: any;
  public htmlEditorConfig: any;
  public supervisorConfig: any;
  public showSupervisor: boolean;
  public isReady: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    this.ticketTypes = ["Change", "Incident"];
    this.ticketTypeConfig = {
      items: this.ticketTypes,
      layout: "vertical",
      onOptionChanged: this.ticketTypeChanged
    };
    this.supervisorConfig = {
      visible: false
    };
    this.htmlEditorConfig = {
      height: 300,
      hint: "Enter some HTML",
      toolbar: {
        items: [
          "undo",
          "redo",
          "separator",
          {
            formatName: "size",
            formatValues: [
              "8pt",
              "10pt",
              "12pt",
              "14pt",
              "18pt",
              "24pt",
              "36pt"
            ]
          },
          {
            formatName: "font",
            formatValues: [
              "Arial",
              "Courier New",
              "Georgia",
              "Impact",
              "Lucida Console",
              "Tahoma",
              "Times New Roman",
              "Verdana"
            ]
          },
          "separator",
          "bold",
          "italic",
          "strike",
          "underline",
          "separator",
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "separator",
          { formarName: "header", formatValues: "[1, 2, 3, 4, 5, false]" },
          "orderedList",
          "bulletList",
          "separator",
          "color",
          "background",
          "separator",
          "link",
          "clear",
          "codeBlock",
          "blockquote",
          "variable"
        ]
      },
      variables: {
        dataSource: ["FirstName", "LastName", "Department"],
        escapeChar: ["{", "}"]
      }
    };
  }

  ngAfterViewInit() {
    this.validateForm();
  }

  public ticketTypeChanged(event): void {
    if (this.isReady) {
      //const supervisor = this.requestForm.instance.getEditor("supervisor");
      if (event.value === "Change") {
        //supervisor.option("visible", true);
        this.showSupervisor = true;
      } else {
        //supervisor.option("visible", false);
        this.showSupervisor = false;
      }
      //this.cdr.detectChanges();
    }
  }

  public validateForm(): void {
    if (this.isReady) {
      const result =
        this.requestForm &&
        this.requestForm.instance &&
        this.requestForm.instance.validate();
      if (result) {
        this.submitDisabled = !result.isValid;
      }
    }
    this.cdr.detectChanges();
  }

  public contentReady(): void {
    this.isReady = true;
    this.cdr.detectChanges();
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxFormModule,
    DxButtonModule,
    DxHtmlEditorModule,
    DxRadioGroupModule,
    DxTextBoxModule,
    DxValidationGroupModule,
    DxValidationSummaryModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
