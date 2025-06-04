import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogSection() {
    const navigate = useNavigate();

    const blogPosts = [
        {
            id: 1,
            title: "Guidelines for Proper Newborn Care",
            excerpt:
                "Essential tips for new parents on how to care for newborns effectively and safely.",
            image: "/image/blog-newborn-care.jpg",
            imageAlt: "Mother with newborn baby",
            imageFallback: "image4.png",
            author: "Nguyen Thi An",
            date: "03/10/2025",
            time: "09:00",
            views: 150,
            category: "Infant Care",
        },
        {
            id: 2,
            title: "Nutrition Regimen for Children's Development",
            excerpt:
                "Balanced nutrition plans that support healthy growth and development in young children.",
            image: "/image/blog-nutrition.jpg",
            imageAlt: "Children having healthy food",
            imageFallback: "image4.png",
            author: "Dr. Tran Huu Nam",
            date: "03/08/2025",
            time: "15:45",
            views: 210,
            category: "Nutrition",
        },
        {
            id: 3,
            title: "Secrets to Help Your Baby Sleep Well and Deeply",
            excerpt:
                "Discover proven techniques to help your baby develop healthy sleep patterns.",
            image: "/image/blog-sleep.jpg",
            imageAlt: "Sleeping baby with teddy bear",
            imageFallback: "image4.png",
            author: "Dang Minh Hoa",
            date: "03/05/2025",
            time: "18:20",
            views: 190,
            category: "Sleep Habits",
        },
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1.5 w-12 bg-cyan-500 rounded-full"></span>
                            <h2 className="text-lg font-medium text-cyan-500">
                                Latest Articles
                            </h2>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Childcare Tips & Knowledge
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate("/blog")}
                        className="px-5 py-2 text-sm border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors flex items-center gap-1"
                    >
                        See all articles
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function BlogCard({ post }) {
    const navigate = useNavigate();

    const handleImageError = (e) => {
        e.target.src = post.imageFallback;
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={post.image}
                    alt={post.imageAlt}
                    onError={handleImageError}
                    className="w-full h-60 object-cover"
                />
                <Badge
                    variant="outline"
                    className="absolute top-4 left-4 bg-white bg-opacity-80 text-cyan-600 font-medium"
                >
                    {post.category}
                </Badge>
            </div>

            <div className="p-6">
                <h3
                    className="text-xl font-bold text-gray-800 mb-2 hover:text-cyan-600 cursor-pointer transition-colors"
                    onClick={() => navigate(`/blog/${post.id}`)}
                >
                    {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
