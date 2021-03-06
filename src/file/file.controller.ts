import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { configMulter } from "../lib/multer";
import { FileService } from "src/file/file.service";
import { AuthGuard } from 'src/lib/auth.guard';
  
  @Controller('file')
  export class FileController {
    constructor(
      private readonly fileService: FileService, 
    ) {}
    // Залив файла файлопомойка
    @UseInterceptors(FilesInterceptor('files', 10, {
      storage: configMulter,
      fileFilter : ( req  ,  file ,  cb )  =>  {
        req.body.url = 'all/' 
        cb(null, true)
      }
    }) )
    @UseGuards(new AuthGuard())
    @Post()
    async uploadFile(
      @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        return await this.fileService.setFile(files)
    }



    // Вернуть все файлы
    @UseGuards(new AuthGuard())
    @Get('all')
    async getFile(){
      return await this.fileService.getFile()
    }
    // Вернуть по alias
    @Get('/:url')
    async getFileId(    
      @Param('url') url: string,
      @Res() res
    ){
      return await this.fileService.getFileUrl(url, res)
    }

  }
  