
import { motion } from "framer-motion";

const activities = [
  {
    title: "Sports & Athletics",
    description:
      "We encourage students to stay active and participate in various sports and athletic activities that build discipline, resilience, and teamwork. Our well-equipped sports facilities and trained coaches ensure that students excel in football, cricket, badminton, table tennis, and athletics.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXlKTGFweiEeiKR7D5Vccw9YeHJa-aa9vS_Q&s",
  },
  {
    title: "Cultural Programs & Performing Arts",
    description:
      "Creativity is at the heart of learning. Our cultural programs provide a platform for students to showcase their talents in dance, music, drama, poetry, and art exhibitions. Annual events like the Cultural Fest and Annual Function help students gain confidence.",
    image: "https://plus.unsplash.com/premium_photo-1709059480517-a2bba843bda5?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Community Service & Leadership Programs",
    description:
      "We believe in instilling values of social responsibility and leadership. Our students actively participate in volunteering programs, charity drives, and cleanliness campaigns, fostering empathy and teamwork.",
    image: "https://plus.unsplash.com/premium_photo-1664372599725-8bd352e23421?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Annual Events & Celebrations",
    description:
      "Our school organizes several annual events like Sports Meet, Independence Day & Republic Day celebrations, Teachers' Day, and festive celebrations. These events create lasting memories and strengthen our community.",
    image: "https://thumbs.dreamstime.com/b/portrait-elementary-age-schoolgirl-showing-colorful-paining-to-camera-art-class-primary-school-classroom-29952032.jpg",
  },
];

export default function ActivitiesContent() {
  return (
    <div className="py-12 px-24 max-[768px]:px-10 max-[1115px]:px-10">
      <h2 className="text-4xl font-bold text-center text-customGray mb-12">
        Activities at St. Columbus School
      </h2>
      <div className="space-y-16">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-[8%] max-[768px]:gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full md:w-1/2 h-72 max-[540px]:h-64 rounded-lg shadow-lg object-cover"
            />
            <div className="md:w-1/2 text-center font-roboto text-customGray md:text-left">
              <h3 className="text-2xl font-semibold mb-4">
                {activity.title}
              </h3>
              <p className="text-justify text-lg leading-relaxed">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
