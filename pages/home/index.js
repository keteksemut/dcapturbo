export default function Home({ messages }) {
  return (
    <div>{messages}</div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      messages: 'Hello World',
    }
  }
};
