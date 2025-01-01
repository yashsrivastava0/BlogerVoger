import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.user?.name}
        </strong>{" "}
        Highly motivated and adaptable full-stack developer passionate about creating
        dynamic and user-friendly web applications. Skilled in front-end and back-end
        technologies, cloud platforms, and DevOps tools. Known for strong problem-solving 
        bilities, a quick learning curve, and excellent communication skills, I excel in 
        collaborative and independent environments while delivering impactful digital solution
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
      I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and have
      a solid background in JavaScript, Python, HTML5, and CSS3. I am proficient in 
      using Redux, Axios, JWT for state management, API integration, and secure authentication.
      My experience also includes working with databases such as MongoDB and MySQL to design
      efficient data storage solutions. I leverage tools like Git, VS Code, and Figma for 
      version control, project management, and creating intuitive user interfaces. With a focus 
      on building scalable, dynamic web applications, I follow industry best practices to deliver
      high-performance, user-centric solutions. My goal is to ensure efficient development workflows,
      optimize application performance, and create seamless, interactive user experiences.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Professional Highlights:
      </h2>
      <p>
        Successfully developed and deployed numerous full-stack applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>
      <br />
      <span>
        Yash is dedicated to leveraging his expertise to contribute to
        innovative projects and drive technological advancements. Whether
        working on front-end interfaces or back-end logic, he is passionate
        about delivering exceptional digital solutions that meet user needs and
        exceed client expectations.
      </span>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
      I am passionate about technology, particularly web development, problem-solving, and continuous learning. I thrive on tackling challenging projects, such as building an Uber-like app using the MERN stack, where I applied my skills in React.js, Node.js, MongoDB, and Express.js. I’m inspired by the dynamic tech landscape and aim to contribute to impactful projects while constantly honing my skills. In addition, I value collaboration, teamwork, and creativity, believing that diverse perspectives drive innovative solutions. In the future, I aspire to master emerging technologies and contribute to creating meaningful, user-centered solutions
      </p>
    </div>
  );
}

export default About;
