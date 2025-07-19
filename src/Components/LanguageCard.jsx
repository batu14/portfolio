const LanguageCard = ({ name, description, Icon }) => {
    
  return (
    <div className="bg-white skill shadow-sm rounded-xl p-6 w-full hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        <Icon className="text-3xl text-gray-600" />
        <h2 className="text-xl font-medium text-gray-900">{name}</h2>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default LanguageCard;
