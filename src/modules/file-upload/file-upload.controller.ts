import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadImage(
        @Param('id') productId: string,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: 'File is too large',
                }),
                new FileTypeValidator({
                    fileType: /.(jpg|jpeg|png|webp|gif|svg)$/,
                }),
            ],
        })) file: Express.Multer.File,
    ) {
        return this.fileUploadService.uploadImage(file, productId);
    }
}