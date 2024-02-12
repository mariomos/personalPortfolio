// "use client";

// import React from "react";
// import SectionHeading from "./section-heading";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";
// import { experiencesData } from "@/lib/data";
// import { useSectionInView } from "@/lib/hooks";
// import { useTheme } from "@/context/theme-context";

// export default function Experience() {
//   const { ref } = useSectionInView("Experience");
//   const { theme } = useTheme();

//   return (
//     <section id="experience" ref={ref} className=" scroll-mt-6 lg:scroll-mt-28 mb-28 sm:mb-40">
//       <SectionHeading>My experience</SectionHeading>
//       <VerticalTimeline lineColor="">
//         {experiencesData.map((item, index) => (
//           <React.Fragment key={index}>
//             <VerticalTimelineElement
//               contentStyle={{
//                 background:
//                   theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
//                 boxShadow: "none",
//                 border: "1px solid rgba(0, 0, 0, 0.05)",
//                 textAlign: "left",
//                 padding: "1.3rem 2rem",
//               }}
//               contentArrowStyle={{
//                 borderRight:
//                   theme === "light"
//                     ? "0.4rem solid #9ca3af"
//                     : "0.4rem solid rgba(255, 255, 255, 0.5)",
//               }}
//               date={item.date}
//               icon={item.icon}
//               iconStyle={{
//                 background:
//                   theme === "light" ? "white" : "#404652",
//                 fontSize: "1.5rem",
//               }}
//             >
//               <h3 className="font-semibold capitalize">{item.title}</h3>
//               <div className="flex flex-row justify-between">
//                 <p className="font-normal !mt-0">{item.company}</p>
//                 <p className="font-normal !mt-0">{item.location}</p>
//               </div>
//               <ul className="!mt-1 !font-normal text-gray-700 dark:text-white/75 list-disc">
              
//                 {item.description.map((point, idx) => (
//                   <li key={idx}>{point}</li>
//                 ))}

//               </ul>
//             </VerticalTimelineElement>
//           </React.Fragment>
//         ))}
//       </VerticalTimeline>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10 text-center items-center justify-center">
//         <a className="hover:bg-gray-200 text-gray-500 rounded-lg p-2 grayscale hover:grayscale-0"><img className='h-14 text-gray-500' src="/dotslash.png" alt='dotslash'/></a>
//         <a className="hover:bg-gray-200 text-gray-500 rounded-lg p-2 grayscale hover:grayscale-0"><img className='h-14 text-gray-500' src="/amazon.png" alt='dotslash'/></a>
//         <a className="hover:bg-gray-200 text-gray-500 rounded-lg p-2 grayscale hover:grayscale-0"><img className='h-14 text-gray-500' src="/bolt.png" alt='dotslash'/></a>
//         <a className="hover:bg-gray-200 text-gray-500 rounded-lg p-2 grayscale hover:grayscale-0"><img className='h-14 text-gray-500' src="/nb.png" alt='dotslash'/></a>
//         <a className="hover:bg-gray-200 text-gray-500 rounded-lg p-2 grayscale hover:grayscale-0"><img className='h-14 text-gray-500' src="/spotify.png" alt='dotslash'/></a>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light" ? "white" : "#404652",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <div className="flex flex-row justify-between">
                 <p className="font-normal !mt-0">{item.company}</p>
                 <p className="font-normal !mt-0">{item.location}</p>
              </div>
              <ul className="!mt-1 !font-normal text-gray-700 dark:text-white/75 list-disc">
                {item.description.map((point, idx) => (
                <li key={idx}>{point}</li>
                ))}
              
              </ul>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
