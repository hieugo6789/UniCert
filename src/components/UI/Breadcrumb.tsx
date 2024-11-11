import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <Breadcrumb separator=" / ">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? <Link to={item.link}>{item.label}</Link> : item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
