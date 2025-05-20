interface Photo {
    id: number;
    issue_id: number;
    image_url: string;
    caption?: string;
    takenAt?: Date;
    createdAt: Date;
    file?: File;
}

export default Photo;

