import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { createBlogPost } from '../api/createBlog';
import { uploadToCloud } from '../api/uploadImage';
import { useMember } from '../context/memberContext';

const BlogEditor = () => {
    const [blogHeading, setBlogHeading] = useState<string>("");
    const [blogContent, setBlogContent] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const { isMember } = useMember();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadToCloud(file);
            setImageUrl(url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (isMember === '') {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-center">
                    You Need To Be A Member Of A Group To Write A Blog Post.
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex justify-center mt-12 py-8 px-4">
            <div className="w-full max-w-3xl shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">
                    Write New Blog Post
                </h1>
                <div className="space-y-4">
                    <input
                        className="input input-bordered w-full"
                        type="text"
                        placeholder="Group Name..."
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <input
                        className="input input-bordered w-full"
                        type="text"
                        placeholder="Blog Heading..."
                        value={blogHeading}
                        onChange={(e) => setBlogHeading(e.target.value)}
                    />
                    <input
                        className="file-input file-input-bordered w-full"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    <Editor
                        value={blogContent}
                        initialValue="Write Your Blog Content Here..."
                        apiKey="your-api-key"
                        onEditorChange={(newText) => setBlogContent(newText)}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        }}
                    />
                </div>
                <div className="mt-6">
                    <button
                        onClick={() =>
                            createBlogPost(blogHeading, blogContent, groupName, imageUrl)
                        }
                        className="btn btn-neutral bg-primary text-white hover:text-primary w-full"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
