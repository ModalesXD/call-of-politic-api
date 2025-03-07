import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdeologyService } from '../services/ideology.service';
import { CreateIdeologyDto, UpdateIdeologyDto } from '../dto/ideology.dto';

@ApiTags('Ideologies')
@Controller('ideologies')
export class IdeologyController {
  constructor(private readonly ideologyService: IdeologyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ideologies' })
  @ApiResponse({ status: 200, description: 'Return all ideologies.' })
  async findAll(@Query('isActive') isActive?: boolean) {
    return this.ideologyService.findAll(isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ideology by id' })
  @ApiResponse({ status: 200, description: 'Return an ideology.' })
  async findOne(@Param('id') id: string) {
    return this.ideologyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ideology' })
  @ApiResponse({ status: 201, description: 'The ideology has been created.' })
  async create(@Body() createIdeologyDto: CreateIdeologyDto) {
    return this.ideologyService.create(createIdeologyDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an ideology' })
  @ApiResponse({ status: 200, description: 'The ideology has been updated.' })
  async update(@Param('id') id: string, @Body() updateIdeologyDto: UpdateIdeologyDto) {
    return this.ideologyService.update(id, updateIdeologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ideology' })
  @ApiResponse({ status: 200, description: 'The ideology has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.ideologyService.remove(id);
  }
}
