import Guide from "@/components/Guide";
import { trim } from "@/utils/format";
import { PageContainer } from "@ant-design/pro-components";
import { Outlet, useModel } from "@umijs/max";
import styles from "./index.less";

const HomePage: React.FC = () => {
  const { name } = useModel("global");
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <h2>父路由插槽内容：</h2>
        <Guide name={trim(name)} />
      </div>
      <div>
        <h2>子路由插槽内容：</h2>
        <Outlet />
      </div>
    </PageContainer>
  );
};

export default HomePage;
