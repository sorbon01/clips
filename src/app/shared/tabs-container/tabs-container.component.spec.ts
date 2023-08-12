import { TestBed, ComponentFixture } from "@angular/core/testing";
import { TabsContainerComponent } from "./tabs-container.component";
import { Component } from "@angular/core";
import { TabComponent } from "../tab/tab.component";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <app-tabs-container>
      <app-tab tabTitle="Tab 1">Tab 1</app-tab>
      <app-tab tabTitle="Tab 2">Tab 2</app-tab>
    </app-tabs-container>
  `
})
class TestHostComponent{ }


describe('TabsContainer Component', ()=>{
  let fixture: ComponentFixture<TestHostComponent>;
  let component:TestHostComponent;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
        declarations: [TabsContainerComponent, TabComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',() => {
    expect(component).toBeTruthy();
  })

  it('should have two tabs', ()=>{
    const tabs = fixture.debugElement.queryAll(By.css('li'));
    const containerComponent = fixture.debugElement.query(
      By.directive(TabsContainerComponent)
    );
    const tabsProp = containerComponent.componentInstance.tabs;

    expect(tabs.length)
      .withContext("Tabs did not render.")
      .toBe(2);
    expect(tabsProp.length)
      .withContext("Could not grab component property.")  
      .toBe(2);
  })
});