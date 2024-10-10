import { v4 as uuid } from 'uuid';

export const fileNamer = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error, fileName: string) => void
) => {
    if (!file) return callback(new Error('File is empty'), null);

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${uuid()}.${fileExtension}`;

    callback(null, fileName);
};
