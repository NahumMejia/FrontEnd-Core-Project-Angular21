import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissionLabelPipe',
  standalone: true,
})
export class PermissionLabelPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
