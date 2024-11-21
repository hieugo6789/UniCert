import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCourseDetail from "../../../hooks/Course/useCourseDetail";
import CustomButton from "../../../components/UI/CustomButton";
import { allCoursePaginationData } from "../../../models/course";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import useUpdateCart from "../../../hooks/Cart/useUpdateCart";
import useCourseEnrollment from "../../../hooks/Enrollment/useCourse";
import { courseEnrollment } from "../../../models/enrollment";
import Coin from "../../../assets/images/Coin.png"
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";

interface certTab {
    certId: number;
    certName: string;
    certCode: string;
    certDescription: string;
    certImage: string;
    typeName: string;
}

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState<allCoursePaginationData | null>(null);
    const { state, getCourseDetails } = useCourseDetail();
    const [cert, setCert] = useState<certTab[]>([]);
    const [voucherList, setVoucherList] = useState<any[]>([]);
        
    const userId = Cookies.get("userId");
    const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
    const [pendingPaymentCourses, setPendingPaymentCourses] = useState<courseEnrollment[]>([]);
    const { state: cartState, getCart } = useCartByUserId();
    const { updateCart } = useUpdateCart();
    const { courseEnrollment, refetchCourseEnrollments } = useCourseEnrollment({ userId: userId || "" });
    const [isInCart, setIsInCart] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isPendingPayment, setIsPendingPayment] = useState(false);
    useEffect(() => {
        setCert([]);
        getCourseDetails(id || "-1");
    }, [id]);

    useEffect(() => {
        if (state) {
            setCourseDetail(state?.currentCourse);
            setCert(state?.currentCourse?.certificationDetails || []);
            setVoucherList(state?.currentCourse.voucherDetails || []);
        }
    }, [state]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => observer.observe(element));
        return () => elements.forEach((element) => observer.unobserve(element));
    }, []);

    const handleIntersection = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    };

    useEffect(() => {
        if (userId) {
            getCart(userId);
            refetchCourseEnrollments(userId);
        } else {
            setPurchasedCourses([]);
            setIsInCart(false);
            setIsPurchased(false);
            setIsPendingPayment(false);
        }
    }, [userId]);

    useEffect(() => {
        const successfulCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "Completed");
        const pendingPaymentCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "OnGoing");
        setPurchasedCourses(successfulCourses);
        setPendingPaymentCourses(pendingPaymentCourses);
    }, [courseEnrollment]);

    useEffect(() => {
        const purchased = purchasedCourses.some((e) =>
            (e.courseDetails || []).some((c) => c.courseId.toString() === id)
        );
        const cart = cartState.currentCart?.courseDetails?.some(
            (course: any) => course.courseId.toString() === id
        );
        const pendingPayment = pendingPaymentCourses.some((e) =>
            (e.courseDetails || []).some((c) => c.courseId.toString() === id)
        );
        setIsInCart(!!cart);
        setIsPurchased(!!purchased);
        setIsPendingPayment(!!pendingPayment);
    }, [purchasedCourses, pendingPaymentCourses, cartState.currentCart, id]);

    const addToCart = (courseId: string) => async () => {
        if (!userId) {
            showToast("Please log in to add courses to your cart.", "error");
            return;
        }
        const examIds = cartState.currentCart.examDetails.map((exam: any) => exam.examId);
        const courseIds = cartState.currentCart.courseDetails.map((course: any) => course.courseId);
        try {
            await updateCart(userId, { examId: [...examIds], courseId: [...courseIds, courseId] });
            getCart(userId);
            showToast("Course added to cart successfully", "success");
        } catch (error) {
            console.error("Failed to add course to cart: ", error);
            showToast("Failed to add course to cart", "error");
        }
    };

    useEffect(() => {
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt mà
          });
        };
        scrollToTop();
      });

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 p-4 text-gray-300 text-sm md:text-base overflow-x-auto">
                <Link to="/" className="hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">Home</Link>
                <span>/</span>
                <Link to="/courses" className="hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">Courses</Link>
                <span>/</span>
                <span className="text-blue-400 truncate">{courseDetail?.courseName}</span>
            </nav>

            {/* Course Header */}
            <div className="w-full px-4 py-6 md:p-10 ">
                <h1 className="text-center fade-in uppercase text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    {courseDetail?.courseName || "Course not found"}
                </h1>
                <h2 className="fade-in text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-5 text-center">
                    Course Details
                </h2>
                <div className="fade-in text-white " 
                    dangerouslySetInnerHTML={{ __html: courseDetail?.courseDescription || "" }} 
                />

                {/* Course Fee */}
                <div className="flex items-center justify-center flex-wrap fade-in text-white text-xl md:text-2xl mt-5 gap-2">
                    <p>Course Fee: </p>
                    {courseDetail?.courseDiscountFee === courseDetail?.courseFee ? (
                        <div className="flex items-center">
                            <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="ml-1 text-yellow-600 font-bold">
                                {courseDetail?.courseDiscountFee?.toLocaleString('en-US')}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center">
                                <span className="text-yellow-600 font-bold">
                                    {courseDetail?.courseDiscountFee?.toLocaleString('en-US')}
                                </span>
                                <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 line-through">
                                    {courseDetail?.courseFee?.toLocaleString('en-US')}
                                </span>
                                <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-5 px-4">
                    {isPurchased ? (
                        <CustomButton label="Purchased" disabled className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" />
                    ) : isInCart ? (
                        <CustomButton label="In Cart" disabled className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" />
                    ) : isPendingPayment ? (
                        <CustomButton label="Pending Payment" disabled className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" />
                    ) : (
                        <CustomButton 
                            label="Add to Cart" 
                            shining 
                            onClick={addToCart(state.currentCourse.courseId)} 
                            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" 
                        />
                    )}
                </div>
            </div>

            {/* Certificate Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 md:px-10">
                {cert.map((cert) => (
                    <div key={cert.certId} className="p-4 md:p-5 bg-gray-700 rounded-lg shadow-lg flex flex-col items-center">
                        <h1 className="uppercase text-xl md:text-2xl lg:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                            Prepare for the certificate
                        </h1>
                        <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold mt-4 mb-2 text-center">
                            {cert.certName}
                        </p>
                        <div className="w-24 h-24 md:w-36 md:h-36 m-auto">
                            <img 
                                src={cert.certImage} 
                                alt={cert.certName} 
                                className="hover:scale-105 transition-transform cursor-pointer" 
                                onClick={() => navigate("/certificate/" + cert.certId)} 
                            />
                        </div>
                    </div>
                ))}
                <div className="m-auto fade-in">
                    <CustomButton label="Get more certificates" shining onClick={() => navigate("/certificate")} className="fade-in" />
                </div>
            </div>

            {/* Voucher Information */}
            <div className="text-center px-4 md:px-5 pb-10">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-10">
                    Voucher Available
                </h1>
                <div className="text-white text-xl md:text-2xl lg:text-3xl flex flex-wrap justify-center gap-4 mt-6">
                    {voucherList.length ? voucherList.map((voucher, index) => (
                        <div key={index} className="p-4 bg-blue-700 rounded-md w-full sm:w-auto">
                            <p className="font-semibold">{voucher.name}</p>
                            <p className="text-sm md:text-base text-gray-200">{voucher.description}</p>
                        </div>
                    )) : (
                        <p className="text-gray-400">No vouchers available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
