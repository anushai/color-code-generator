import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-masonry-grid',
  templateUrl: './masonry-grid.component.html',
  styleUrls: ['./masonry-grid.component.css'],
})
export class MasonryGridComponent implements OnChanges {
  selectedColors: any = [];
  colorList: any = [];
  @Input() selectedColor = '';
  constructor(private http: HttpClient) {
    this.http.get('assets/json/color-names.json').subscribe((res) => {
      this.colorList = res;
      this.selectedColors = this.colorList;
    });
  }

  searchColors() {
    this.selectedColors = this.colorList.filter(
      (record: any) => record.name.toLowerCase().indexOf(this.selectedColor.toLowerCase()) !== -1
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedColor'] && changes['selectedColor']['currentValue']) {
      this.searchColors();
    }
  }
}
