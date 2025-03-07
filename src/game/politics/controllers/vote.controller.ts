import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VoteService } from '../services/vote.service';
import { CreateVoteDto } from '../dto/vote.dto';

@ApiTags('Votes')
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all votes' })
  @ApiResponse({ status: 200, description: 'Return all votes.' })
  async findAll(
    @Query('electionId') electionId?: string,
    @Query('voterId') voterId?: string,
  ) {
    return this.voteService.findAll(electionId, voterId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vote by id' })
  @ApiResponse({ status: 200, description: 'Return a vote.' })
  async findOne(@Param('id') id: string) {
    return this.voteService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cast a vote' })
  @ApiResponse({ status: 201, description: 'The vote has been cast.' })
  async create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Get('election/:electionId/results')
  @ApiOperation({ summary: 'Get election results' })
  @ApiResponse({ status: 200, description: 'Return election results.' })
  async getElectionResults(@Param('electionId') electionId: string) {
    return this.voteService.getElectionResults(electionId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vote' })
  @ApiResponse({ status: 200, description: 'The vote has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.voteService.remove(id);
  }
}
