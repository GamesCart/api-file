import {  HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { ConfigService } from '@nestjs/config';
import { file404 } from 'src/lib/404-file';
 

@Injectable()
export class FileService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(File)
    private readonly userRepository: Repository<File>,
  ) {}
  async getFile(): Promise<File[]>{
    return await this.userRepository.find()
  }
  async setFile(files: Array<Express.Multer.File>): Promise<File[]>{
    const file = []
    files.forEach((element, index) => {
      file.push({
        path :element.path.slice(9).replace(/\\/gi, '/') // форматирования строки
      })
   
    });
    return await this.userRepository.save(file)
  }
  async getFileUrl(url: string, res){    
    const file = await this.userRepository.findOne(
      {
        where: { alias: url }
      }
    )
    if(file){
      res.redirect(`${this.configService.get('MY_DOMANE')}/${file.path}`)
    }
    res.status(404).send(file404)
  }
}
