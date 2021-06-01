import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { ConfigService } from '@nestjs/config';
import { file404 } from 'src/lib/404-file';
 

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(File)
    private readonly userRepository: Repository<File>,
  ) {}
  // Показать все файлы + прикрутить базовые фильтрацию пагицаию
  async getFile(): Promise<File[]>{
    return await this.userRepository.find()
  }
  // Сохранить в БД путь файла и вернуть уникальный ключ
  async setFile(files: Array<Express.Multer.File>): Promise<File[]>{
    const file = []
    files.forEach((element, index) => {
      file.push({
        path :element.path.slice(9).replace(/\\/gi, '/') // форматирования строки
      })
   
    });
    return await this.userRepository.save(file)
  }
  // Найди файл по alias(key)
  async getFileUrl(url: string, res){    
    const file = await this.userRepository.findOne(
      {
        where: { alias: url }
      }
    )
    // Файл найден вернуть его через редирект!
    if(file){
      res.redirect(`${this.configService.get('MY_DOMANE')}/${file.path}`)
    }
    // Файл не найден выкинуть erros
    res.status(404).send(file404)
  }
}
