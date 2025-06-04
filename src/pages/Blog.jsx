import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Badge } from "@/components/ui/badge";

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
        views: 190,
        category: "Sleep Habits",
    },
    {
        id: 4,
        title: "How to Choose the Right Babysitter",
        excerpt:
            "Learn the key factors to consider when selecting a babysitter for your child.",
        image: "/image/blog-babysitter.jpg",
        imageAlt: "Babysitter playing with children",
        imageFallback: "image4.png",
        author: "Pham Thi Lan",
        date: "03/02/2025",
        views: 120,
        category: "Babysitting",
    },
    {
        id: 5,
        title: "Top 5 Toys for Early Childhood Development",
        excerpt:
            "Discover the best toys that promote learning and development for young children.",
        image: "/image/blog-toys.jpg",
        imageAlt: "Children playing with toys",
        imageFallback: "image4.png",
        author: "Le Van Minh",
        date: "02/28/2025",
        views: 180,
        category: "Child Development",
    },
    {
        id: 6,
        title: "Effective Communication with Your Toddler",
        excerpt:
            "Tips and techniques to improve communication and understanding with your toddler.",
        image: "/image/blog-communication.jpg",
        imageAlt: "Parent talking to toddler",
        imageFallback: "image4.png",
        author: "Tran Thi Hoa",
        date: "02/25/2025",
        views: 200,
        category: "Parenting",
    },
    {
        id: 7,
        title: "Healthy Snacks for Kids",
        excerpt:
            "Quick and easy recipes for nutritious snacks that kids will love.",
        image: "/image/blog-snacks.jpg",
        imageAlt: "Healthy snacks for kids",
        imageFallback: "image4.png",
        author: "Nguyen Van An",
        date: "02/20/2025",
        views: 170,
        category: "Nutrition",
    },
    {
        id: 8,
        title: "Building a Strong Parent-Child Bond",
        excerpt:
            "Strategies to strengthen the emotional connection between parents and children.",
        image: "/image/blog-bond.jpg",
        imageAlt: "Parent hugging child",
        imageFallback: "image4.png",
        author: "Pham Thi Mai",
        date: "02/15/2025",
        views: 220,
        category: "Parenting",
    },
    {
        id: 9,
        title: "Preparing Your Child for Preschool",
        excerpt:
            "Helpful tips to ensure a smooth transition to preschool for your child.",
        image: "/image/blog-preschool.jpg",
        imageAlt: "Child at preschool",
        imageFallback: "image4.png",
        author: "Le Thi Thu",
        date: "02/10/2025",
        views: 140,
        category: "Education",
    },
];

export default function Blog() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
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
                            <span>{post.author}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>{post.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <span>{post.views} views</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
