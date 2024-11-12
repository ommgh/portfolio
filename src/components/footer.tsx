import Container from "./container";

const Footer = () => {
  return (
    <footer className="mb-20 mt-14">
      <Container>
        <hr className="w-full border-1 border-base-200 mb-8" />
        <div className="flex gap-10">
          <a
            href="https://github.com/ommgh"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="https://twitter.com/indium114"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>
          <a href="mailto:om.works01@gmail.com">email</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
