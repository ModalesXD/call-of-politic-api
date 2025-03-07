import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ElectionsService } from '../services/elections.service';
import { CreateElectionDto, UpdateElectionDto } from '../dto/election.dto';

@ApiTags('Elections')
@Controller('elections')
export class ElectionsController {
  constructor(private readonly electionsService: ElectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all elections' })
  @ApiResponse({ status: 200, description: 'Return all elections.' })
  async findAll(
    @Query('countryId') countryId?: string,
    @Query('status') status?: string,
  ) {
    return this.electionsService.findAll(countryId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an election by id' })
  @ApiResponse({ status: 200, description: 'Return an election.' })
  async findOne(@Param('id') id: string) {
    return this.electionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new election' })
  @ApiResponse({ status: 201, description: 'The election has been created.' })
  async create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionsService.create(createElectionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an election' })
  @ApiResponse({ status: 200, description: 'The election has been updated.' })
  async update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionsService.update(id, updateElectionDto);
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start an election' })
  @ApiResponse({ status: 200, description: 'The election has been started.' })
  async startElection(@Param('id') id: string) {
    return this.electionsService.startElection(id);
  }

  @Put(':id/end')
  @ApiOperation({ summary: 'End an election' })
  @ApiResponse({ status: 200, description: 'The election has been ended.' })
  async endElection(@Param('id') id: string) {
    return this.electionsService.endElection(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an election' })
  @ApiResponse({ status: 200, description: 'The election has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.electionsService.remove(id);
  }
}
