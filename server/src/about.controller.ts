import { Controller, Get, Render } from '@nestjs/common';

@Controller('about')
export class AboutController {
  @Get()
  @Render('about')
  getAbout() {
    return {};
  }
}
