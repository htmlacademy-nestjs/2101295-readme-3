import { BlogTagService } from './blog-tag.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TagRdo } from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogCategoryService: BlogTagService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTag = await this.blogCategoryService.getTag(id);
    return fillObject(TagRdo, existTag);
  }

  @Get('/')
  async index() {
    const tag = await this.blogCategoryService.getTags();
    return fillObject(TagRdo, tag);
  }

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const newTag = await this.blogCategoryService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogCategoryService.deleteTag(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.blogCategoryService.updateTag(id, dto)
    return fillObject(TagRdo, updatedTag);
  }
}
